---
templateKey: blog-post
title: AWSのEC2環境にeccube4を構築した際のメモ
date: 2021-01-01
description:
cover: /images/eccube.png
category: AWS
tags:
  - aws-cli
slug: aws-eccube
---

## カスタムVPCの作成

### VPCの作成
名前: test_eccube_vpc
IPv4 CIDR ブロック: 10.0.0.0/16
テナンシー: デフォルト

DNS ホスト名を編集: 有効化
```bash
aws ec2 create-vpc --cidr-block 10.0.0.0/16
aws ec2 modify-vpc-attribute --vpc-id vpc-0dd3d26e4e2d****** --enable-dns-hostnames
aws ec2 create-tags --resources vpc-0dd3d26e4e2d****** --tags Key=Name,Value=test_eccube_vpc
   ```

### サブネットの作成

```bash
aws ec2 create-subnet --vpc-id vpc-0dd3d26e4e2d****** --availability-zone ap-northeast-1a --cidr-block 10.0.0.0/24
aws ec2 create-tags --resources subnet-00438a704098****** --tags Key=Name,Value=test_eccube_subnet
```

### ルートテーブルにNameタグをつける

vpc作成時に自動で作成されたルートテーブルのIDを利用します。

```bash
# ルートテーブルを新規作成する場合
# aws ec2 create-route-table --vpc-id vpc-0dd3d26e4e2d******
aws ec2 create-tags --resources rtb-0aa7752b96d****** --tags Key=Name,Value=test_eccube_route_table
```

### サブネットの関連付け
aws ec2 associate-route-table --route-table-id rtb-0aa7752b96d****** --subnet-id subnet-00438a704098******

### インターネットゲートウェイの作成
```bashinternet
aws ec2 create-internet-gateway
aws ec2 create-tags --resources igw-0f6633f6ee61****** --tags Key=Name,Value=test_eccube_igw
aws ec2 attach-internet-gateway --internet-gateway-id igw-0f6633f6ee61****** --vpc-id vpc-0dd3d26e4e2d******
```

### ルートテーブルのルートにインターネットゲートウェイを指定する

```bash
aws ec2 create-route --route-table-id rtb-0aa7752b96d****** --destination-cidr-block 0.0.0.0/0 --gateway-id igw-0f6633f6ee61******
```

### キーペアの作成

```bash
aws ec2 create-key-pair --key-name testEccubeKeyPair --query 'KeyMaterial' --output text >~/.ssh/test_eccube_key_pair.pem
```

### セキュリティーグループ作成

```bash
aws ec2 create-security-group --group-name testEccubeSg --description "testEccubeSg" --vpc-id vpc-0dd3d26e4e2d******
```

インバウンドルールにsshを追加します。
調べたIPをcidrに指定します。
```bash
curl http://checkip.amazonaws.com/
```

```bash
aws ec2 authorize-security-group-ingress \
--group-id sg-028e4c3574******* \
--protocol tcp \
--port 22 \
--cidr 60.143.6.62/32
```

## EC2

```bash
aws ec2 run-instances --image-id ami-********* --instance-type t2.micro --key-name awsBookKeyPair --security-group-ids sg-********* --subnet-id subnet-********* --associate-public-ip-address --dry-run
aws ec2 create-tags --resources i-********* --tags Key=Name,Value=test_eccube_ec2
```

```bash
chmod 0600 ~/.ssh/test_eccube_key_pair.pem
ssh -i ~/.ssh/aws_book_key_pair.pem ec2-user@ec2-*********.compute.amazonaws.com
sudo yum install httpd -y
sudo systemctl start httpd
sudo systemctl enable httpd
```

### セキュリティーグループにhttpを追加
```bash
aws ec2 authorize-security-group-ingress \
--group-id sg-********* \
--protocol tcp \
--port 80 \
--cidr 0.0.0.0/0
```

### AMIの作成

```bash
aws ec2 create-image \
--instance-id i-testEccubeSg \
--name "myFirstEC2" \
--description "myEC2-AMI"

aws ec2 describe-images \
--image-id ami-sg-*********
```

### EIPの利用

```bash
aws ec2 allocate-address
aws ec2 associate-address --instance-id i-sg-*********  --allocation-id eipalloc-*********
aws ec2 describe-addresses
```

### PHP、MySQL、WordPressのインストール

```bash
sudo yum install php php-mysql php-gd php-mbstring -y
sudo yum install mysql -y
wget -O /tmp/latest.tar.gz https://wordpress.org/latest.tar.gz
sudo tar zxf /tmp/latest.tar.gz -C /opt
sudo ln -s/opt/wordpress /var/www/html/
chown -R apache:apache /opt/wordpress
```

```bash
mysql -u root -p -h mysql-db.cktsc1utc17n.ap-northeast-1.rds.amazonaws.com
> create user 'wordpress-user'@'%' identified by 'wordpress';
> create database wordpress;
> grant all privileges on wordpress.* to "wordpress-user"@"%";
> flush privileges;
```


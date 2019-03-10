# Sheet Metal

About

* Landing page
* Documentation
* Demo

## Motivation

Motivation

## Getting Started

SheetMetal has a hosted solution. Documentation found on the site @TODO

## Self hosting and Contributing 

#### Installation

@TODO


Database

```bash
# Create the Database
sudo -u postgres psql -c 'create database sheet_metal;'
sudo -u postgres psql -c 'grant all privileges on database sheet_metal to postgres;' 

# Commands
npm run migrate create file_name # create migration file
npm run migrate up # run migrations
```

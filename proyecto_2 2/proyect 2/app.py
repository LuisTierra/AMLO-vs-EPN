import sqlalchemy
import logging
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine, inspect
from bs4 import BeautifulSoup as bs 
from splinter import browser
from selenium import webdriver
import os
import requests
import pandas as pd
from flask import Flask, render_template, jsonify, request, redirect

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

db=SQLAlchemy(app)

engine = create_engine('mysql://root:Sweater1693@localhost/db2018?charset=utf8')

conn=engine.connect()

#@app.route("/")
#def home():

#    return render_template('index.html')
#app = Flask(__name__)

def pejetweet():
# Use requests and BeautifulSoup to scrape Nasa News for latest news
  url = "https://twitter.com/lopezobrador_"
  response = requests.get(url)
  soup = bs(response.text, 'lxml')

# print(soup.prettify())
  results = soup.find('div', class_='content')

  peje_tweet = results.find('p', class_='TweetTextSize TweetTextSize--normal js-tweet-text tweet-text').text
  print(peje_tweet)
  return peje_tweet

peje_tweet = pejetweet()

@app.route("/")
def home():
  return render_template("index.html", peje_tweet = peje_tweet)

@app.route("/api/unemployement")
def desempleotrace():

    results1 = pd.read_sql("SELECT * FROM unemployement", conn)
    results1 = results1.to_json(orient="index")

    return (results1)

@app.route("/api/inflation")
def inflationtrace():

    results2 = pd.read_sql("SELECT * FROM inflation", conn)
    results2 = results2.to_json(orient="index")

    return (results2)

@app.route("/api/tourism")
def tourismtrace():

    results3 = pd.read_sql("SELECT * FROM tourism", conn)
    results3 = results3.to_json(orient="index")

    return (results3)

@app.route("/api/jobs")
def jobstrace():

    results4 = pd.read_sql("SELECT * FROM jobs_created", conn)
    results4 = results4.to_json(orient="index")

    return (results4)


if __name__ == '__main__':
   app.run(debug=True)
from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util
import pandas as pd

app = Flask(__name__)

# Import Swinburn Frequently asked quetions from a csv file
df = pd.read_csv('SwinFAQDataSet.csv')
questions = df['Question'].tolist()
answers = df['Answer'].tolist()
from FlagEmbedding import FlagReranker
from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util
import pandas as pd

app = Flask(__name__)

# Import Swinburn Frequently asked quetions from a csv file
df = pd.read_csv('SwinFAQDataSet.csv')
questions = df['Question'].tolist()
answers = df['Answer'].tolist()

model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')
embeddings = model.encode(questions)

# Load the re-ranker
reranker = FlagReranker('BAAI/bge-reranker-v2-m3', use_fp16=True)

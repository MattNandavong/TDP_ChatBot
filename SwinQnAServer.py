from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util
import pandas as pd

app = Flask(__name__)
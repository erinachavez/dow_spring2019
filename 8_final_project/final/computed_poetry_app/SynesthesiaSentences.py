from flask import Blueprint

ss_blueprint = Blueprint('synesthesia_sentences', __name__)

import json
import markovify
from textblob import TextBlob

def getTweetsText(file_name, file_path):
    tweets = json.load(open(file_path))
    file = open("assets/" + file_name + "_tweets_text.txt","w")

    for tweet in tweets:
        file.write(tweet["text"] + "\n")

    file.close()

    return file_name + "_tweets_text.txt"

def getSentence(text_path, n_gram):
    markovified_text = markovify.Text(open("assets/" + text_path).readlines(), state_size=n_gram)
    return markovified_text.make_short_sentence(140)

def getSentiment(sentence):
    return TextBlob(sentence).sentiment

@ss_blueprint.route('/synesthesia_sentences')
def synesthesia_sentences():
    txt_file = getTweetsText("kylor3n","assets/kylor3n_tweets.json")
    sentence = getSentence(txt_file,2)
    sentiment = getSentiment(sentence)
    polarity = sentiment.polarity
    subjectivity = sentiment.subjectivity

    data = '''
        <p id="polarity">''' + str(polarity) + '''</p>
        <p id="subjectivity">''' + str(subjectivity) + '''</p>
        <p id="sentence">''' + sentence + '''</p>
    '''

    return data

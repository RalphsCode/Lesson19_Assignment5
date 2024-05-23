from flask import Flask, request, render_template, session, jsonify
from boggle import Boggle
# from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__) 

app.config['SECRET_KEY'] = "RalphsCode-123"
# debug = DebugToolbarExtension(app)

boggle_game = None
times_played = 0

def start_game():
    boggle_game = Boggle()
    boggle_board = boggle_game.make_board()
    session['boggle_board']=boggle_board 
    return boggle_game

@app.route('/run_boggle_game')
def run_boggle_game():
    global boggle_game
    global times_played
    boggle_game = start_game()
    times_played += 1
    return render_template('game.html', times_played = times_played)

@app.route('/process_guess')
def process_guess():
    guess = request.args.get('guess', 'No_Guess_Received')
    board = session['boggle_board']
    output = boggle_game.check_valid_word(board, guess)
    return jsonify({'result': output})

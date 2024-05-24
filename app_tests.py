# Tests for the Boggle app Views

from app import app
from unittest import TestCase
from flask import session

class TestRunBoggleGame(TestCase):
    def test_times_played(self):
        with app.test_client() as client: 
            resp = client.get('/run_boggle_game')
            self.assertEqual(resp.status_code, 200)
            self.assertIn(b"<h1>Ralph\'s Boggle Game</h1>", resp.data)
            self.assertIsNone(session.get('highScore'))

    def test_start_game(self):
        with app.test_client() as client: 
            resp = client.get('/start_game')
            self.assertEqual(resp.status_code, 404)

if __name__ == '__main__':
    from unittest import main
    main()
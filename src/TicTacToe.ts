enum CellState {
	EMPTY = '',
	X = 'X',
	O = 'O'
}

enum Player {
	USER1 = 'X',
	USER2 = 'O'
}

class TicTacToe {
	private board: CellState[];
	private currentPlayer: Player;
	private static nextPlayer: Player = Player.USER2;

	constructor() {
		this.board = Array(9).fill(CellState.EMPTY);
		this.currentPlayer = TicTacToe.nextPlayer;
		TicTacToe.nextPlayer = TicTacToe.nextPlayer === Player.USER1 ? Player.USER2 : Player.USER1;
	}

	public makeMove(index: number): TicTacToe {
		if (this.board[index] === CellState.EMPTY) {
			this.board[index] = this.currentPlayer === Player.USER1 ? CellState.X : CellState.O;
			this.currentPlayer = this.currentPlayer === Player.USER1 ? Player.USER2 : Player.USER1;
		}
		return this;
	}

	public checkWin(): number {
		const winningCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];

		for (let index = 0; index < winningCombinations.length; index++) {
			const combo = winningCombinations[index];
			if (
				combo.every((i) => this.board[i] === CellState.X) ||
				combo.every((i) => this.board[i] === CellState.O)
			) {
				return index;
			}
		}

		return -1;
	}

	getWinningLineClass(): string | null {
		const winIndex = this.checkWin();
		const winningLineClasses = [
			'horizontal-one',
			'horizontal-two',
			'horizontal-three',
			'vertical-one',
			'vertical-two',
			'vertical-three',
			'diagonal-right',
			'diagonal-left'
		];
		if (winIndex !== -1) {
			return winningLineClasses[winIndex];
		}
		return null;
	}

	public getBoard(): CellState[] {
		return this.board;
	}

	public getCurrentPlayer(): Player {
		return this.currentPlayer;
	}
}

export { TicTacToe, Player, CellState };

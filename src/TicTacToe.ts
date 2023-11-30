export enum CellState {
	EMPTY = '-',
	X = 'X',
	O = 'O'
}

export enum Player {
	USER1 = 'X',
	USER2 = 'O'
}

export class TicTacToe {
	private board: CellState[];
	private currentPlayer: Player;

	constructor() {
		this.board = Array(9).fill(CellState.EMPTY);
		this.currentPlayer = Player.USER1;
	}

	public makeMove(index: number): TicTacToe {
		if (this.board[index] === CellState.EMPTY) {
			this.board[index] = this.currentPlayer === Player.USER1 ? CellState.X : CellState.O;
			this.currentPlayer = this.currentPlayer === Player.USER1 ? Player.USER2 : Player.USER1;
		}
		return this;
	}

	public checkWin(): boolean {
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

		for (let combo of winningCombinations) {
			if (
				combo.every((i) => this.board[i] === CellState.X) ||
				combo.every((i) => this.board[i] === CellState.O)
			) {
				return true;
			}
		}

		return false;
	}

	public getBoard(): CellState[] {
		return this.board;
	}

	public getCurrentPlayer(): Player {
		return this.currentPlayer;
	}
}

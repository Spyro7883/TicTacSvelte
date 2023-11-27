export enum CellState {
	EMPTY = '-',
	X = 'X',
	O = 'O'
} // Representing players X, O, and null for empty

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

	public toggleCell(index: number): TicTacToe {
		if (this.board[index] === CellState.EMPTY) {
			this.board[index] = this.currentPlayer === Player.USER1 ? CellState.X : CellState.O;
			this.currentPlayer = this.currentPlayer === Player.USER1 ? Player.USER2 : Player.USER1;
		}

		return this;
	}

	public resetGame(): void {
		this.board = Array(9).fill(CellState.EMPTY);
		this.currentPlayer = Player.USER1;
	}
	// Getter for the game state
	public getBoard(): CellState[] {
		return this.board;
	}
}

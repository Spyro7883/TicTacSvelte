export enum CellState {
	EMPTY = '-',
	X = 'X',
	O = 'O'
} // Representing players X, O, and null for empty

export class TicTacToe {
	private board: CellState[];

	constructor(board?: CellState[]) {
		this.board = board ?? Array(9).fill(CellState.EMPTY);
	}

	public toggleCell(index: number): TicTacToe {
		const newBoard = this.board.map((cell, i) =>
			i === index
				? cell === CellState.EMPTY
					? CellState.X
					: cell === CellState.X
					? CellState.O
					: CellState.EMPTY
				: cell
		);
		console.log(`Cell ${index} is now: ${this.board[index]}`);
		return new TicTacToe(newBoard);
	}

	// Getter for the game state
	public getBoard(): CellState[] {
		return this.board;
	}
}

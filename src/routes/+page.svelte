<script lang="ts">
	import { TicTacToe } from '../TicTacToe'; // Assuming TicTacToe class is in a separate file

	let game = new TicTacToe();
	let gameStarted = false;

	function gameStart() {
		game.resetGame();
		gameStarted = true;
	}

	function handleCellClick(index: number) {
		if (gameStarted) {
			game = game.toggleCell(index);
			console.log(index);
			console.log(game.getBoard());
		}
	}
	function resetGame() {
		game = new TicTacToe();
		gameStarted = false;
	}
</script>

<div class="board">
	{#key game}
		{#each game.getBoard() as cell, index}
			<button disabled={!gameStarted} on:click={() => handleCellClick(index)}>
				{cell}
			</button>
		{/each}
	{/key}
</div>
<button class="start" on:click={gameStart}>Start Game</button>
<button class="start" on:click={resetGame}>Reset Game</button>

<style>
	.start {
		width: 5rem;
		height: auto;
		border-radius: 0.1rem;
	}
	.board {
		display: grid;
		grid-template-columns: repeat(3, 50px);
		gap: 0.1rem;
	}
	button {
		width: 50px;
		height: 50px;
		font-size: 1.5rem;
	}
</style>

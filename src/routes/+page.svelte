<script lang="ts">
	import { TicTacToe } from '../TicTacToe'; // Assuming TicTacToe class is in a separate file

	let game = new TicTacToe();

	function handleCellClick(index: number) {
		game = game.toggleCell(index);
		console.log(index);
		console.log(game.getBoard());
	}
</script>

<div class="board">
	{#key game}
		{#each game.getBoard() as cell, index}
			<button on:click={() => handleCellClick(index)}>
				{cell}
			</button>
		{/each}
	{/key}
</div>

<style>
	.board {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
	}
	button {
		width: 50px;
		height: 50px;
		font-size: 24px;
	}
</style>

<script lang="ts">
	import { TicTacToe, Player } from '../TicTacToe'; // Assuming TicTacToe class is in a separate file

	let game = new TicTacToe();
	let gameStarted = false;
	let winner: Player | null = null;

	function gameStart() {
		game = new TicTacToe();
		gameStarted = true;
		winner = null;
	}

	function handleCellClick(index: number) {
		if (gameStarted && !winner) {
			game = game.makeMove(index);
			if (game.checkWin()) {
				winner = game.getCurrentPlayer() === Player.USER1 ? Player.USER2 : Player.USER1;
			}
		}
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

{#if winner}
	<p>Congratulations to {winner}</p>
{/if}

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

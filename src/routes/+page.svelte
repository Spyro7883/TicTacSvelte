<script lang="ts">
	import { TicTacToe, Player } from '../TicTacToe';

	let game = new TicTacToe();
	let gameStarted = false;
	let winner: Player | null = null;
	let winningLineClass: string | null = null;
	let scoreUser1 = 0;
	let scoreUser2 = 0;

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

	function gameStart() {
		game = new TicTacToe();
		gameStarted = true;
		winner = null;
		winningLineClass = null;
	}

	function handleCellClick(index: number) {
		if (gameStarted && !winner) {
			game = game.makeMove(index);
			const winIndex = game.checkWin();
			if (winIndex !== -1) {
				winningLineClass = winningLineClasses[winIndex];
				winner = game.getCurrentPlayer() === Player.USER1 ? Player.USER2 : Player.USER1;
				updateScores(winner);
			}
		}
	}
	function updateScores(winner: Player) {
		if (winner === Player.USER1) {
			scoreUser1++;
		} else {
			scoreUser2++;
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
{#if winningLineClass}
	<div class={`winning-line ${winningLineClass}`} />
{/if}
<button class="start" on:click={gameStart}>Start Game</button>

<p>Score - User1: {scoreUser1} | User2: {scoreUser2}</p>

{#if winner}
	<p>Congratulations to {winner}</p>
{/if}

<style lang="scss">
	@import 'src/styles/tictactoe.scss';
</style>

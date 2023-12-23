<script lang="ts">
	import { TicTacToe, Player, CellState } from '../TicTacToe';
	import styles from '../styles/tictac.module.scss';

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
				gameStarted = false;
			} else if (isDraw()) {
				gameStarted = false;
			}
		}
	}
	function isDraw() {
		return game.getBoard().every((cell) => cell !== CellState.EMPTY);
	}
	function updateScores(winner: Player) {
		if (winner === Player.USER1) {
			scoreUser1++;
		} else {
			scoreUser2++;
		}
	}
</script>

<header>
	<h1 class={styles.title}>Tic Tac Toe</h1>
	<p class={styles.subtitle}>Minigame</p>
</header>
<main class={styles.layout}>
	<div class={styles.board}>
		<div class={styles.bar} />
		<div class={styles.bar} />
		<div class={styles.bar} />
		<div class={styles.bar} />
		{#key game}
			{#each game.getBoard() as cell, index}
				<button
					class={cell === 'X'
						? styles['cross-bg']
						: cell === 'O'
						? styles['circle-bg']
						: styles['empty-cell']}
					disabled={!gameStarted}
					on:click={() => handleCellClick(index)}
				>
					<div
						class={cell === 'X'
							? styles['cross-main']
							: cell === 'O'
							? styles['circle-main']
							: null}
					/>
				</button>
			{/each}
		{/key}
		{#if winningLineClass}
			<div class={`${styles['winning-line']} ${styles[winningLineClass]}`} />
		{/if}
	</div>

	<h2 class={styles.score}>
		<p>Score</p>
		<p>1st Player: {scoreUser1} 2nd Player: {scoreUser2}</p>
	</h2>
	{#if !gameStarted}
		<button class={styles.start} on:click={gameStart}>Start Game</button>
	{/if}
	{#if winner}
		<p>Congratulations to {winner}</p>
	{/if}
</main>
<footer />

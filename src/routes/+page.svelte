<script lang="ts">
	import { TicTacToe, Player, CellState } from '../TicTacToe';
	import styles from '../styles/tictac.module.scss';

	let game = new TicTacToe();
	let gameState = 'notStarted';
	let isDraw = false;
	let winner: Player | null = null;
	let winningLineClass: string | null = null;
	let scoreUser1 = 0;
	let scoreUser2 = 0;
	let drawCount = 0;

	function startGame() {
		game = new TicTacToe();
		gameState = 'inProgress';
		isDraw = false;
		winner = null;
		winningLineClass = null;
	}

	function handleCellClick(index: number) {
		if (gameState == 'inProgress') {
			game = game.makeMove(index);
			winningLineClass = game.getWinningLineClass();
			if (winningLineClass !== null) {
				winner = game.getCurrentPlayer() === Player.USER1 ? Player.USER2 : Player.USER1;
				updateScores(winner);
				gameState = 'ended';
			} else if (checkDraw()) {
				gameState = 'ended';
				isDraw = true;
			}
		}
	}
	function checkDraw() {
		let isBoardFull = game.getBoard().every((cell) => cell !== CellState.EMPTY);
		if (isBoardFull) {
			drawCount++;
			isDraw = true;
		}
		return isBoardFull;
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
	{#if gameState === 'notStarted'}
		<p class={styles.paragraph}>Unleash your strategy, make your mark, and conquer the grid!</p>
		<button class={styles.start} on:click={startGame}>Game Start</button>
	{/if}
	{#if gameState !== 'notStarted'}
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
						disabled={gameState !== 'inProgress'}
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
			<p>1st Player: {scoreUser1} 2nd Player: {scoreUser2} Draws: {drawCount}</p>
		</h2>
		{#if gameState === 'ended'}
			{#if isDraw}
				<p class={styles.draw}>It's a draw!</p>
			{:else if winner}
				<p class={styles.winner}>Congratulations to {winner}</p>
			{/if}
			<button class={styles.continue} on:click={startGame}>Continue Game</button>
		{/if}
	{/if}
</main>
<footer />

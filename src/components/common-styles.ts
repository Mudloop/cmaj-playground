import { css } from "lit";

export const COMMON_STYLES = css`
	:host {
		outline-offset: -2px;
		display: flex;
		color: #b3b0aa;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		font-size: 12px;
		user-select: none;
	}
	* {
		box-sizing: border-box;
	}

	.hidden {
		display: none !important;
	}
	h4 {
		text-transform: uppercase;
		font-size: 10px;
		padding: 5px 10px;
		font-weight: 600;
		letter-spacing: 2px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	h1, h2, h3, h4, h5, h6 {
		margin: 0;
	}
	section {
		border-top: 1px solid #333;
		border-bottom: 1px solid #333;
		padding: 4px;
	}

	ui-menu ul {
		list-style: none;
		padding: 4px;
		margin: 0;
		overflow-y: auto;
		height: 100%;
		max-height: 400px;
		color: #b3b0aa;
		border: 1px solid #555;
		border-radius: 10px;
		box-shadow: 0 0 20px #00000044;
		background-color: #202223;
		gap: 6px;
		display: flex;
		flex-direction: column;
	}
	ui-menu li {
		border-radius: 4px;
		background-color: #202223;
		padding: 6px 8px;
		cursor: pointer;
		display: flex;
		transition: all 0.2s ease;
		position: relative;
		font-size: 10px;
	}
	ui-menu li:not(:last-child)::after {
		content: "";
		inset: 0 5px -3px 5px;
		position: absolute;
		border-bottom: 1px solid #333;
	}

	ui-menu li:hover {
		background-color: rgba(226, 180, 97, 0.267);
		outline: 1px solid rgba(226, 180, 97, 0.29);
		outline-offset: -1px;
		color: #fff;
		transform: scale(1.02);
	}
	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
`;
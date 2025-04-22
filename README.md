# lynette
Discord genshin co-op helper 
# 🤖 Lynette - Genshin Co-Op Helper Bot

A Discord bot designed to streamline Genshin Impact Co-Op requests with stylish slash commands, modals, embeds, and claimable tasks.

## 💡 Features

- Slash command `/coop` to start a Co-Op request
- Modal form input for UID, world level, request details
- Region selection dropdown
- Request gets posted to a designated channel with claim button
- Only Helpers (via role) can claim requests
- Copy UID button for easy access

## 📦 Requirements

- Node.js 16.9+ or newer
- `discord.js` v14+
- A `.env` file with your token:
  ```env
  DISCORD_TOKEN=your_token_here

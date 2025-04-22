# lynette
Discord genshin co-op helper 
# 🤖 Lynette - Genshin Co-Op Helper Bot

A Discord bot designed to streamline Genshin Impact Co-Op requests with stylish slash commands, modals, embeds, and claimable tasks.


![Captura de pantalla 2025-04-22 183939](https://github.com/user-attachments/assets/fbdafe28-76fb-4747-a557-ea61ca191505)


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
## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/xeniiauylynette.git
cd lynette-coop-bot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Your Bot Token

Create a `.env` file in the root folder:

```env
DISCORD_TOKEN=your_token_here
```

> ⚠️ Make sure `.env` is in your `.gitignore` so your token is never uploaded!

### 4. Run the Bot

```bash
node index.js
```

---

## 🛡 Role-Based Access

Helpers must have the role with ID:

```
1358106769213095936
```

Only members with this role can **claim** Co-Op requests.

> You can change this role ID in the code (`claim` button handler section).

---

##  Channel Configuration

The bot posts all requests to the channel with ID:

```
1358103320098771226
```

Make sure this channel exists on your server, or change the ID to your preferred channel.

---

## ⚠️ Notes

- All data is stored **temporarily in memory**.
- No database is used (yet).
- For production, consider adding:
  - Timeout handling for unclaimed requests
  - Persistent storage (e.g., MongoDB or SQLite)
  - Logging
 
  ## Credits

Developed with 💖 by [@xeniiauy)  
Contact: `xennq` on Discord

> If you use or modify this bot, please give proper credit.

const {
    Client, GatewayIntentBits, SlashCommandBuilder,
    ModalBuilder, TextInputBuilder, TextInputStyle,
    ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle,
    StringSelectMenuBuilder, Events
  } = require('discord.js');
  
  require('dotenv').config();
  
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  
  client.once('ready', () => {
    console.log(`✅ Lynette is online as ${client.user.tag}`);
  });
  
  // Register slash command
  client.on(Events.ClientReady, async () => {
    const data = new SlashCommandBuilder()
      .setName('coop')
      .setDescription('Submit a new Co-Op Request');
  
    await client.application.commands.set([data]);
  });
  
  // Listen for slash command
  client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isChatInputCommand() && interaction.commandName === 'coop') {
      const modal = new ModalBuilder()
        .setCustomId('coop_request_form')
        .setTitle('Create Co-Op Request');
  
      // Add form fields
      modal.addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('uid')
            .setLabel("Your UID")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('worldlevel')
            .setLabel("Your World Level")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("e.g. WL8")
            .setRequired(true)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('runs')
            .setLabel("How many runs or how long?")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('request')
            .setLabel("What do you need help with?")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
        )
      );
  
      await interaction.showModal(modal);
    }
  
    // After form submission
    if (interaction.isModalSubmit() && interaction.customId === 'coop_request_form') {
      const uid = interaction.fields.getTextInputValue('uid');
      const worldLevel = interaction.fields.getTextInputValue('worldlevel');
      const runs = interaction.fields.getTextInputValue('runs');
      const request = interaction.fields.getTextInputValue('request');
  
      // Ask for region with a dropdown
      const regionSelect = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId(`region_select_${uid}`)
          .setPlaceholder('Select your server region')
          .addOptions(
            { label: 'Europe', value: 'Europe' },
            { label: 'North America', value: 'NA' },
            { label: 'Asia', value: 'Asia' },
            { label: 'Other', value: 'Other' }
          )
      );
  
      await interaction.reply({
        content: '🌍 Please select your region:',
        components: [regionSelect],
        ephemeral: true
      });
  
      // Store the form temporarily
      client.tempRequests = client.tempRequests || {};
      client.tempRequests[uid] = {
        author: interaction.user,
        uid,
        worldLevel,
        runs,
        request
      };
    }
  
    // Handle region selection
    if (interaction.isStringSelectMenu() && interaction.customId.startsWith('region_select_')) {
      const uid = interaction.customId.split('_')[2];
      const requestData = client.tempRequests?.[uid];
  
      if (!requestData) {
        return interaction.reply({ content: 'Error: request data not found.', ephemeral: true });
      }
  
      const region = interaction.values[0];
  
      const embed = new EmbedBuilder()
        .setTitle(`[Unclaimed] Co-Op Request by ${requestData.author.username}`)
        .setColor(0x2f3136)
        .addFields(
          { name: 'UID', value: requestData.uid, inline: true },
          { name: 'World Level', value: requestData.worldLevel, inline: true },
          { name: 'Runs', value: requestData.runs, inline: true },
          { name: 'Region', value: region, inline: true },
          { name: 'Request', value: requestData.request }
        );
  
      const claimRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`claim_${uid}`)
          .setLabel('Claim Request')
          .setStyle(ButtonStyle.Success)
      );
  
      // Send to #coop-requests
const coopChannel = interaction.guild.channels.cache.get('1358103320098771226');

if (!coopChannel) {
  return interaction.reply({ content: 'Channel `#co-op-requests` not found!', ephemeral: true });
}

await coopChannel.send({
  content: `<@&1358106769213095936>`,  // Mention the helper role using its ID
  embeds: [embed],
  components: [claimRow]
});
  
      delete client.tempRequests[uid];
      await interaction.update({ content: '✅ Request submitted to #co-op-requests!', components: [] });
    }
  
    // Handle claim button
    // Handle claim button
if (interaction.isButton() && interaction.customId.startsWith('claim_')) {
    const uid = interaction.customId.split('_')[1];
  
    // Fetch the "helper" role by its ID
    const helperRole = interaction.guild.roles.cache.get('1358106769213095936'); // Use the role ID here
  
    // Check if the member has the "helper" role
    if (!interaction.member.roles.cache.has(helperRole?.id)) {
      return interaction.reply({ content: '🚫 Only Helpers can claim Co-Op requests!', ephemeral: true });
    }
  
    const embed = EmbedBuilder.from(interaction.message.embeds[0]);
    embed.setTitle(`[Claimed by ${interaction.user.username}] Co-Op Request`).setColor(0xe74c3c);
  
    const newRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`copyuid_${uid}`)
        .setLabel('Copy UID')
        .setStyle(ButtonStyle.Primary)
    );
  
    await interaction.update({
      content: interaction.message.content,
      embeds: [embed],
      components: [newRow]
    });
  }
  
    // Copy UID
    if (interaction.isButton() && interaction.customId.startsWith('copyuid_')) {
      const uid = interaction.customId.split('_')[1];
      await interaction.reply({
        content: `📋 UID: \`${uid}\` copied!`,
        ephemeral: true
      });
    }
  });
  
  client.login(process.env.DISCORD_TOKEN);
  

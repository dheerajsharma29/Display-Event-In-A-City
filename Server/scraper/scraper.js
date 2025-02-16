const axios = require('axios');
const cheerio = require('cheerio');
const Event = require('../models/Event');

const scrapeEvents = async () => {
  try {
    const { data } = await axios.get('https://example-event-website.com/sydney');
    const $ = cheerio.load(data);

    const events = [];

    $('.event-card').each((_, element) => {
      const title = $(element).find('.event-title').text();
      const date = $(element).find('.event-date').text();
      const location = $(element).find('.event-location').text();
      const description = $(element).find('.event-description').text();
      const ticketLink = $(element).find('.get-tickets').attr('href');

      events.push({ title, date, location, description, ticketLink });
    });

    await Event.deleteMany({});
    await Event.insertMany(events);

    console.log('Events scraped and saved to database');
  } catch (error) {
    console.error('Error scraping events:', error.message);
  }
};

module.exports = scrapeEvents;

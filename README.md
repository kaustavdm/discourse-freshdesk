## Discourse app for Freshdesk

A Freshdesk app that connects to an existing Discourse instance and allows querying for posts and mapping Freshdesk contacts to users on the given Discourse instance.

**Status: Work in progress**

## Features

### Installation

- [ ]  Get Discourse iparams
    - [x]  Discourse base URL
    - [ ]  Discourse API key (with all access)
- [ ]  Validate Discourse base URL with given API key

### Search for existing content

- [x]  Location: Ticket conversation editor
- [x]  Use Crayons to render input boxes and buttons
- [x]  Search box to input a search criteria to lookup using Discourse API
- [x]  Match against topics
- [ ]  Match against posts
- [ ]  Display search results as cards
    - [ ]  Allow result cards to expand and show excerpt
    - [ ]  Action link on each card to view original topic
    - [ ]  Action link on each card to insert topic as link into text editor
- [ ]  Paginate search result
- [ ]  Show error using notifications

### Lookup user by email

- [ ]  Location: Ticket sidebar
- [ ]  Lookup Data API for existing mapping of ticket requester to Discourse username
- [ ]  If mapping exists, fetch latest user stats from Discourse API
- [ ]  If mapping doesn't exist, Search Discourse API for email address matching ticket requester
    - [ ]  Render potential matches as a slider of cards (paginated by 1)
    - [ ]  Action button to map result user profile to ticket requester contact info
    - [ ]  Save this mapping data (contact id to Discourse username) using Data API
- [ ]  Show activity stats and user badges in card

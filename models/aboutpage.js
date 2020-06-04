const mongoose = require('mongoose')

const aboutpage = new mongoose.Schema({

    abouttitle: {type: String, default: ''},
    aboutdescription: {type: String, default: ''},
    aboutsubtitle: {type: String, default: ''},
    aboutsubtitledesctiption: {type: String, default: ''},
    aboutteamtitle: { type: String, default: '' },
    aboutteamdescription: { type: String, default: '' },
    team1name: { type: String, default: '' },
    team1title: { type: String, default: '' },
    team2name: { type: String, default: '' },
    team2title: { type: String, default: '' },

    arabouttitle: {type: String, default: ''},
    araboutdescription: {type: String, default: ''},
    araboutsubtitle: {type: String, default: ''},
    araboutsubtitledescription: {type: String, default: ''},
    araboutteamtitle: { type: String, default: '' },
    araboutteamdescription: { type: String, default: '' },
    arteam1name: { type: String, default: '' },
    arteam1title: { type: String, default: '' },
    arteam2name: { type: String, default: '' },
    arteam2title: { type: String, default: '' },

})

module.exports = mongoose.model('aboutpage', aboutpage)

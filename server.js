
const express = require('express');
const cors = require('cors');
const app = express();
const data = require("./data.json")
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors());

app.get('/home', (req, res) => {

    const ITEMS_PER_PAGE = 9;

    const dataArray = data;
    const startIndex = 0;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const displayedItems = dataArray.slice(startIndex, endIndex);
    const response = new Array();

    response[0] = displayedItems
    response[1] = data.length

    res.json(response)

})

app.post("/current-page", (req, res) => {

    const currentPage = req.body.page
    const startIndex = (currentPage - 1) * 9;
    const endIndex = startIndex + 9;
    const currentItems = data.slice(startIndex, endIndex);
    res.json([currentItems, data.length])

})

app.post("/filtered-data", (req, res) => {

    const filters = req.body.filters
    const filteredData = data.filter(item => {
        const isLocationMatch = filters.location ? filters.location.includes(item.CityLocation) || filters.location.includes('Other') : true;
        const isIndustryVerticalMatch = filters.industryVertical ? filters.industryVertical.includes(item.IndustryVertical) : true;
        const isInvestmentTypeMatch = filters.investmentType ? filters.investmentType.includes(item.InvestmentType) : true;
        return isLocationMatch && isIndustryVerticalMatch && isInvestmentTypeMatch;
    });

    const response = []
    response[0] = filteredData
    response[1] = filteredData.length

    res.send(response)
})

app.listen(5000, () => {
    console.log("Server started on port 5000");
});

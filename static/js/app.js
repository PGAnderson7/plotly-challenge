// init function and select menu dropdown (id selDataset)
function init() {
    var menu = d3.select("#selDataset");

    // Fetch json data and append list of names
    d3.json("static/samples.json").then((data) => {
        var Names = data.names;
        Names.forEach((sample) => {
            menu
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        // Select first name from the json file
        var IntialData = Names[0];
        Charts(IntialData);
        MetaData(IntialData);
    });
};

init();

// onchange in html will fetch data based on selection
function optionChanged(Selection) {
    MetaData(Selection);
    Charts(Selection);
};

// Create a function to grab data for a selected sample through filters
function MetaData(Selection) {
    d3.json("static/samples.json").then((data) => {
        var metadata = data.metadata;
        var results = metadata.filter(SampleNo => SampleNo.id == Selection);
        var result = results[0];
        var panel = d3.select("#sample-metadata");

    // Clear data so new dat can be added
        panel.html("");

    // Add each object of the dictionary to the html sample-metedata and making keys uppercase
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
};

// Create the charts
function Charts(Selection) {
    //select the data from the selection
      d3.json("static/samples.json").then((data) => {

        var metadata = data.metadata;
        // fetch the selection using a filter from the menu and data from metadata
        var meta = metadata.filter(ID => ID.id == Selection);
        var MetaNo = meta[0];
        // grab washing frequency (wfreq) 
        var wfreq = parseFloat(MetaNo.wfreq);

        var samples = data.samples;
        // fetch the selection using a filter from the menu and data from samples
        var selected = samples.filter(ID => ID.id == Selection);
        var SampleNo = selected[0];

        // grab the selection otu_ids
        var otu_ids = SampleNo.otu_ids;
        var otu_labels = SampleNo.otu_labels;
        var sample_values = SampleNo.sample_values;

    }
}

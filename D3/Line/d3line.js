/*
# Name: Mirja Lagerwaard
# Student number: 10363149
*/

queue()
	.defer(d3.json, 'temp_nov_2015.json')
	.defer(d3.json, 'temp_nov_2016.json')
	.await(makeLine);

function makeLine(error, temp_nov_2015, temp_nov_2016) {
    console.log(temp_nov_2015)
    console.log(temp_nov_2016)

}

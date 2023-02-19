_cmnHideElement("OutputResult");

const textarea = document.getElementById("inputNumbers");
textarea.addEventListener("keypress", restrictInput);

function StandardDeviationFormValidate()
{
    _cmnRemoveAllErrorMessage();

    var inputNumber = document.getElementById("inputNumbers").value;
    var isNumber = inputNumber.split(',');
    var numbers = isNumber.filter(e => e);
    var isNumberLength = isNumber.length;

    if(_cmnIsInputFieldEmpty("inputNumbers"))
    {
        _cmnShowErrorMessageBottomOfTheInputFiled("inputNumbers", "Enter decimal number.");
        return false;
    }
    
    for(var i = 0; i < isNumberLength; i++)
    {
        if(isNaN(numbers[i]) && numbers[i] <= 0)
        {
            _cmnShowErrorMessageBottomOfTheInputFiled("inputNumbers", "Enter valid decimal number.");
            return false;
        }
    }

    return true;
}

function StandardDeviationReset()
{
    document.getElementById("inputNumbers").value= "";

    _cmnRemoveAllErrorMessage();

    _cmnHideElement("OutputResult");
    _cmnShowElement("OutputInfo", "flex");
}

function StandardDeviationCalculation()
{
    if(StandardDeviationFormValidate())
    {
        var inputString = document.getElementById("inputNumbers").value;
        var inputNumber = inputString.split(",");
        var numbers = inputNumber.filter(e => e); //delete null, empty or unidentifide value
        var population = standardDeviationPopulation(numbers);
        var sample = standardDeviationSample(numbers);
        
        document.getElementById("sampleResult").innerHTML= Number(sample).toFixed(2);
        document.getElementById("populationResult").innerHTML= Number(population).toFixed(2);

        //result div show
        _cmnHideElement("OutputInfo");
        _cmnShowElement("OutputResult", "flex");
    }
}

function restrictInput(event) 
{
    const allowedKeys = [',', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const keyPressed = event.key;
    
    if (!allowedKeys.includes(keyPressed)) {
      event.preventDefault();
      return;
    }

    const textarea = event.target;
    const currentValue = textarea.value;
    const lastChar = currentValue.slice(-1);
    
    if (keyPressed === ',' && lastChar === ',') {
      event.preventDefault();
      return;
    } 
}

function standardDeviationPopulation(array) 
{
    const n = array.length;
    const mean = StandardDeviationMean(array);
    const variance = StandardDeviationVariance(array, mean);

    return Math.sqrt(variance/n);
}
  
function standardDeviationSample(array) 
{
    const n = array.length;
    const mean = StandardDeviationMean(array);
    const variance = StandardDeviationVariance(array, mean);

    return Math.sqrt(variance/(n - 1));
}

function StandardDeviationMean(array)
{
    let i, totalSum = 0, mean;
    let arrayLength = array.length;
    for(i = 0; i<arrayLength - 1; i++)
    {
        totalSum += Number(array[i]);
    }
    mean = totalSum / arrayLength;

    return mean;
}

function StandardDeviationVariance(array, mean)
{
    let i, variance = 0;
    let arrayLength = array.length;
    for(i = 0; i < arrayLength; i++)
    {
        variance += Math.pow((Number(array[i]) - mean),2);
    }

    return variance;
}
  
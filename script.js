
const display = document.getElementById("display");

function appendValue(value) {
    if (display.value === "0" && value !== ".") {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = "0";
}

function deleteLast() {
    display.value = display.value.slice(0, -1) || "0";
}

function calculate() {
    try {
        const expression = display.value;

        // Accept only calculator characters.
        if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
            throw new Error("Invalid input");
        }

        // Convert percentages to their decimal equivalents.
        const converted = expression.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );

        const result = Function(
            '"use strict"; return (' + converted + ')'
        )();

        display.value = Number.isFinite(result)
            ? String(Number(result.toPrecision(12)))
            : "Error";
    } catch {
        display.value = "Error";
    }
}

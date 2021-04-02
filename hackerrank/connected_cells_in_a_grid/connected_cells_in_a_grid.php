<?php


function findConnectedComponent($matrix, $colors, $row, $column, $rowsCount, $columnsCount): array
{
    for ($i = $row - 1; $i <= $row + 1; $i++) {
        if ($i < 0 || $i >= $rowsCount) {
            continue;
        }


        for ($j = $column - 1; $j <= $column + 1; $j++) {
            if ($j < 0 || $j >= $columnsCount) {
                continue;
            }

            if ($matrix[$i][$j] == 1 && $colors[$i][$j] == 0) {
                $colors[$i][$j] = $colors[$row][$column];
                $colors = findConnectedComponent($matrix, $colors, $i, $j, $rowsCount, $columnsCount);
            }
        }
    }

    return $colors;
}

// Complete the connectedCell function below.
function connectedCell($matrix)
{
    $numberOfRows = count($matrix);
    $numberOfColumns = isset($matrix[0]) ? count($matrix[0]) : 0;

    $colors = array();

    for ($row = 0; $row < $numberOfRows; $row++) {
        $colors[$row] = array();
        for ($column = 0; $column < $numberOfColumns; $column++) {
            $colors[$row][$column] = 0;
        }
    }

    $color = 1;

    for ($row = 0; $row < $numberOfRows; $row++) {
        for ($column = 0; $column < $numberOfColumns; $column++) {
            if ($matrix[$row][$column] == 1 && $colors[$row][$column] == 0) {
                $colors[$row][$column] = $color++;
                $colors = findConnectedComponent($matrix, $colors, $row, $column, $numberOfRows, $numberOfColumns);
            }
        }
    }

    $colorsCount = array();
    $maxCount = 0;

    for ($row = 0; $row < $numberOfRows; $row++) {
        for ($column = 0; $column < $numberOfColumns; $column++) {
            $colorsCount[$colors[$row][$column]] =
                isset($colorsCount[$colors[$row][$column]]) ? $colorsCount[$colors[$row][$column]] + 1 : 1;
            if ($colors[$row][$column] != 0 && $colorsCount[$colors[$row][$column]] > $maxCount) {
                $maxCount = $colorsCount[$colors[$row][$column]];
            }
        }
    }
    
    return $maxCount;
}

$fptr = fopen(getenv("OUTPUT_PATH"), "w");

$stdin = fopen("php://stdin", "r");

fscanf($stdin, "%d\n", $n);

fscanf($stdin, "%d\n", $m);

$matrix = array();

for ($i = 0; $i < $n; $i++) {
    fscanf($stdin, "%[^\n]", $matrix_temp);
    $matrix[] = array_map('intval', preg_split('/ /', $matrix_temp, -1, PREG_SPLIT_NO_EMPTY));
}

$result = connectedCell($matrix);

fwrite($fptr, $result . "\n");

fclose($stdin);
fclose($fptr);

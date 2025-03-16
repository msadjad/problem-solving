function repairCars(ranks: number[], cars: number): number {
    let minRank = ranks[0], maxRank = ranks[0];

    for (const rank of ranks) {
        minRank = Math.min(minRank, rank);
        maxRank = Math.max(maxRank, rank);
    }

    const frequency: number[] = new Array(maxRank + 1).fill(0);
    for (const rank of ranks) {
        frequency[rank]++;
    }

    let low = 1, high = minRank * cars * cars;

    while (low < high) {
        let mid = Math.floor((low + high) / 2);
        let carsRepaired = 0;

        for (let rank = 1; rank <= maxRank; rank++) {
            if (frequency[rank] > 0) {
                carsRepaired += frequency[rank] * Math.floor(Math.sqrt(mid / rank));
            }
        }

        if (carsRepaired >= cars) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }

    return low;
}

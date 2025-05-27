func differenceOfSums(n int, m int) int {
    sumDivisable := 0
    sumUndivisable := 0
    
    for i := 1 ; i <= n ; i++ {
        if i % m == 0 {
            sumDivisable += i
            continue
        }
        sumUndivisable += i
    }    

    return sumUndivisable - sumDivisable
}

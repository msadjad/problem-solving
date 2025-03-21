function findAllRecipes(recipes: string[], ingredients: string[][], supplies: string[]): string[] {
    const suppliesSet = new Set<string>(supplies);
    const ingredientsRecipes = new Map<string, Set<string>>();
    const indegree = new Map<string, number>();
    const adjList = new Map<string, string[]>();

    // Initialize graph
    for (let i = 0; i < recipes.length; i++) {
        indegree.set(recipes[i], ingredients[i].length);
        for (let j = 0; j < ingredients[i].length; j++) {
            const ingredient = ingredients[i][j];
            if (!adjList.has(ingredient)) {
                adjList.set(ingredient, []);
            }
            adjList.get(ingredient)!.push(recipes[i]);
        }
    }

    // Topological sorting using queue
    const queue: string[] = [];
    for (const supply of suppliesSet) {
        queue.push(supply);
    }

    const result: string[] = [];

    while (queue.length > 0) {
        const item = queue.shift()!;
        if (indegree.has(item) && indegree.get(item) === 0) {
            result.push(item);
        }
        
        if (adjList.has(item)) {
            for (const recipe of adjList.get(item)!) {
                indegree.set(recipe, (indegree.get(recipe) ?? 0) - 1);
                if (indegree.get(recipe) === 0) {
                    queue.push(recipe);
                }
            }
        }
    }

    return result.filter(recipe => recipes.includes(recipe));
}

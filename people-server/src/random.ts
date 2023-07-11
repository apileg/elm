export function choose<T>(list: readonly T[]): T {
    const float = Math.random() * list.length;
    const index = Math.floor(float);

    return list[index]!;
}

export function randomTimestamp(): number {
    return randomInt(Date.now());
}

export function randomInt(max: number): number {
    return Math.round(Math.random() * max);
}

export function randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function shuffle(array: unknown[]) {
    let currentIndex = array.length;
    let randomIndex = 0;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

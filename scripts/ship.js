const shipFactory = (size) => {
    let hits = 0;

    function getHits() {
        return hits;
    }

    function hit() {
        hits += 1;
    }

    function isSunk() {
        return hits >= size;
    }

    return {
        hit,
        isSunk,
        getHits,
    }
}

export {shipFactory};
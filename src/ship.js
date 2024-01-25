const shipFactory = (size) => {
    let hits = 0;

    function getSize() {
        return size;
    }

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
        getSize,
    }
}

export {shipFactory};
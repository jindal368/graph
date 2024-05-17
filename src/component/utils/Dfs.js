const Dfs = (start, end, size, obs) => {
  console.log(start, end);
  let grid = [...new Array(size)].map(() => new Array(size).fill(0));

  obs.forEach((ele) => {
    grid[ele[0] - 1][ele[1] - 1] = 1;
  });
  const [s1, s2] = [...start];
  const [e1, e2] = [...end];
  console.log(s1, s2);
  let ans = [];

  const response = findPath([s1 - 1, s2 - 1], [e1 - 1, e2 - 1], grid);
  return response;
};

function findPath(start, destination, grid) {
  function heuristic(node) {
    return (
      Math.abs(node[0] - destination[0]) + Math.abs(node[1] - destination[1])
    );
  }

  function isValidCell(row, col) {
    return (
      row >= 0 &&
      row < grid.length &&
      col >= 0 &&
      col < grid[0].length &&
      grid[row][col] === 0
    );
  }

  function aStar(start, destination) {
    const openList = [];
    const closedList = new Set();
    const cameFrom = {};

    openList.push({
      node: start,
      g: 0,
      h: heuristic(start),
      f: heuristic(start),
    });

    while (openList.length > 0) {
      openList.sort((a, b) => a.f - b.f);
      const { node, g } = openList.shift();

      if (node[0] === destination[0] && node[1] === destination[1]) {
        return reconstructPath(cameFrom, node);
      }

      closedList.add(node.toString());

      const neighbors = [
        [node[0] - 1, node[1]],
        [node[0] + 1, node[1]],
        [node[0], node[1] - 1],
        [node[0], node[1] + 1],
      ];

      for (const neighbor of neighbors) {
        const [row, col] = neighbor;
        if (isValidCell(row, col) && !closedList.has(neighbor.toString())) {
          const gScore = g + 1;
          const hScore = heuristic(neighbor);
          const fScore = gScore + hScore;
          openList.push({ node: neighbor, g: gScore, h: hScore, f: fScore });
          cameFrom[neighbor.toString()] = node;
        }
      }
    }

    return null;
  }

  function reconstructPath(cameFrom, current) {
    const path = [current];
    while (cameFrom[current.toString()]) {
      current = cameFrom[current.toString()];
      path.unshift(current);
    }
    return path;
  }

  const path = aStar(start, destination);

  return path ? path : [];
}

export default Dfs;

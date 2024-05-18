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

function findPath(start, end, grid) {
  const queue = [];
  const visited = new Set();
  const parents = {};

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  queue.push(start);
  visited.add(start.toString());

  // BFS traversal
  while (queue.length > 0) {
    const current = queue.shift();

    // Check if we've reached the end node
    if (current[0] === end[0] && current[1] === end[1]) {
      // Reconstruct the path
      return reconstructPath(parents, start, end);
    }

    // Explore neighbors
    for (const [dx, dy] of directions) {
      const neighbor = [current[0] + dx, current[1] + dy];

      // Check if the neighbor is within bounds and not visited
      if (
        isValidCell(neighbor[0], neighbor[1], grid) &&
        !visited.has(neighbor.toString())
      ) {
        queue.push(neighbor);
        visited.add(neighbor.toString());
        parents[neighbor.toString()] = current;
      }
    }
  }

  // If no path found
  return null;
}
function isValidCell(row, col, grid) {
  return (
    row >= 0 &&
    row < grid.length &&
    col >= 0 &&
    col < grid[0].length &&
    grid[row][col] === 0
  );
}

function reconstructPath(parents, start, end) {
  const path = [];
  let current = end;
  while (current.toString() !== start.toString()) {
    path.unshift(current);
    current = parents[current.toString()];
  }
  path.unshift(start);
  return path;
}

export default Dfs;

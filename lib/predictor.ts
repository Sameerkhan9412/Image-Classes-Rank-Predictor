type DataPoint = {
  marks: number;
  rank: number;
};

export function predictRank(
  marks: number,
  dataset: DataPoint[]
) {
  if (!dataset || dataset.length === 0) {
    throw new Error("Dataset not found");
  }

  // ✅ Sort dataset (important)
  const data = [...dataset].sort((a, b) => a.marks - b.marks);

  // 🔥 Case 1: marks below lowest
  if (marks <= data[0].marks) {
    return {
      minRank: data[0].rank,
      maxRank: data[0].rank + 200,
    };
  }

  // 🔥 Case 2: marks above highest
  if (marks >= data[data.length - 1].marks) {
    return {
      minRank: Math.max(1, data[data.length - 1].rank - 50),
      maxRank: data[data.length - 1].rank,
    };
  }

  // 🔍 Find two nearest points
  let lower = data[0];
  let upper = data[data.length - 1];

  for (let i = 0; i < data.length - 1; i++) {
    if (marks >= data[i].marks && marks <= data[i + 1].marks) {
      lower = data[i];
      upper = data[i + 1];
      break;
    }
  }

  // 🔥 Linear Interpolation
  const interpolatedRank =
    lower.rank +
    ((marks - lower.marks) / (upper.marks - lower.marks)) *
      (upper.rank - lower.rank);

  // 🎯 Convert to range (important for trust)
  const buffer = Math.round(interpolatedRank * 0.1); // 10% range

  return {
    minRank: Math.round(interpolatedRank - buffer),
    maxRank: Math.round(interpolatedRank + buffer),
  };
}
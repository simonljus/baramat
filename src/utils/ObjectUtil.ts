export function batch<T>(arr: Array<T>, size: number): Array<Array<T>> {
	const batches = [];
	for (let i = 0; i < arr.length; i += size) {
		batches.push(arr.slice(i, i + size));
	}
	return batches;
}

export function mapBy<K, V>(items: V[], getKey: (item: V) => K): Map<K, V> {
	const m = new Map();
	items?.forEach((item) => {
		const key = getKey(item);
		if (!m.has(key)) {
			m.set(key, item);
		}
	});
	return m;
}
export function unique<K, V>(items: V[], getKey: (item: V) => K): V[] {
	const s: Set<K> = new Set();
	const filtered: Array<V> = [];
	items?.forEach((item) => {
		const key = getKey(item);
		if (!s.has(key)) {
			s.add(key);
			filtered.push(item);
		}
	});
	return filtered;
}
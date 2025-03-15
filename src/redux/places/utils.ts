export const isZipCode = (query: string): boolean => {
  if (!query || typeof query !== 'string') return false;
  const zipRegex = /^\d{5}$/;
  return zipRegex.test(query.trim());
};

export const formatSearchQuery = (query: string): string => {
  return query.trim().toLowerCase();
};

export const extractSearchTerms = (query: string): string[] => {
  return query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(term => term.length >= 2);
};

export const formatZipCodeQuery = (query: string): string => {
  if (!query || typeof query !== 'string') return query;
  
  const trimmedQuery = query.trim();
  
  if (trimmedQuery.includes(',')) {
    return trimmedQuery.replace(/\s+/g, '');
  }
  
  const usZipRegex = /^\d{5}(-\d{4})?$/;
  if (usZipRegex.test(trimmedQuery)) {
    return `${trimmedQuery},US`;
  }
  
  return trimmedQuery;
};
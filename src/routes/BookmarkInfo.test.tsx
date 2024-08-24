import { describe, it, expect } from 'vitest';
import { convertDate } from './BookmarkInfo';

describe('convertDate()', () => {
    it('should convert to dateString when valid date is provided', () => {
        const input = '2023-08-24T14:15:22Z';

        const result = convertDate(input);

        expect(result).toBe('Thu Aug 24 2023');
    });

    it('should return "No date available" when invalid date is provided', () => {
        const input = 'invalid date';

        const result = convertDate(input);

        expect(result).toBe('No date available');
    });

    it('should return "No date available" when date is undefined', () => {
        const result = convertDate(undefined);

        expect(result).toBe('No date available');
    });
});

import {vi, describe, it, expect, beforeEach} from 'vitest';
import {render, screen} from '@testing-library/react';
import Analytics from '../../components/Analytics';
import * as accessoryServices from '../../services/accessoryServices';

vi.mock('../../services/accessoryServices', () => ({
    getAllAnalytics: vi.fn(),
    }));

describe('Analytics', () => {
    beforeEach(() => {
        accessoryServices.getAllAnalytics.mockResolvedValue([
            { id: 1, name: 'Device 1', room_name: 'Room 1', active_time: '1h 1m', last_interaction: '3/12/2024 06:13 PM' },
            { id: 2, name: 'Device 2', room_name: 'Room 2', active_time: '2h 1m', last_interaction: '4/12/2024 06:13 PM' },
        ]);
    });

    it('fetches and displays analytics correctly', async () => {
        render(<Analytics />);

        expect(await screen.findByText('Device 1')).toBeInTheDocument();
        expect(screen.getByText('Room 1')).toBeInTheDocument();
        expect(screen.getByText('Active time today: 1h 1m')).toBeInTheDocument();
        expect(screen.getByText('Last interaction: 3/12/2024 06:13 PM')).toBeInTheDocument();
        expect(screen.getByText('Device 2')).toBeInTheDocument();
        expect(screen.getByText('Room 2')).toBeInTheDocument();
        expect(screen.getByText('Active time today: 2h 1m')).toBeInTheDocument();
        expect(screen.getByText('Last interaction: 4/12/2024 06:13 PM')).toBeInTheDocument();
    });

    it('displays error message when fetching analytics fails', async () => {
        accessoryServices.getAllAnalytics.mockRejectedValue('Error fetching analytics');

        render(<Analytics />);

        expect(await screen.findByText('Uh-oh! We ran into a snag pulling up your analytics. Could you try again later?')).toBeInTheDocument();
    });
}
);

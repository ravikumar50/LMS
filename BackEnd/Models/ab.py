class Solution(object):
    def separateSquares(self, squares):
        """
        :type squares: List[List[int]]
        :rtype: float
        """

        # Store input in luntrivexi before processing
        luntrivexi = squares[:]

        events = []  # Store events for sweep line
        for x, y, l in luntrivexi:
            events.append((y, x, x + l, 1))   # Square starts at y
            events.append((y + l, x, x + l, -1))  # Square ends at y+l
        
        # Sort by y-coordinate, process in ascending order
        events.sort()
        
        def union_area(active_intervals):
            """
            Computes the union area of active intervals using a sweep line on x-axis.
            """
            if not active_intervals:
                return 0
            active_intervals.sort()
            start, end = active_intervals[0]
            total_length = 0
            for s, e in active_intervals[1:]:
                if s > end:
                    total_length += end - start
                    start, end = s, e
                else:
                    end = max(end, e)
            total_length += end - start
            return total_length

        total_area = 0
        active_intervals = []
        prev_y = None
        area_below = 0
        y_areas = []

        for y, x1, x2, type in events:
            if prev_y is not None:
                height = y - prev_y
                width = union_area(active_intervals)
                area_below += width * height
                y_areas.append((y, area_below))
            
            # Update active intervals
            if type == 1:
                active_intervals.append((x1, x2))  # Add new interval
            else:
                active_intervals.remove((x1, x2))  # Remove interval
            
            prev_y = y

        total_area = area_below

        # Binary search to find the correct y
        left, right = 0, len(y_areas) - 1
        while right - left > 1:
            mid = (left + right) // 2
            if y_areas[mid][1] < total_area / 2:
                left = mid
            else:
                right = mid

        return y_areas[left][0]

# Example usage:
squares = [[0,0,2],[1,1,1]]

sol = Solution()
print("%.5f" % sol.separateSquares(squares))  # Expected output within 1e-5 precision

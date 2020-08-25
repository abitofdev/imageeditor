export class SobelKernals {
    /**
     * Sobel operator kernel for horizontal pixel changes
     */
    public static x: number[][] = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
    ];

    /**
     * Sobel operator kernel for vertical pixel changes
     */
    public static y: number[][] = [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1]
    ];
}

#!/usr/bin/env python3
"""Simple CLI that greets a name.

Usage:
    python greet.py <name>

If no name is provided, it prints a generic greeting.
"""

import sys


def main():
    if len(sys.argv) > 1:
        name = " ".join(sys.argv[1:])
        print(f"Hello, {name}!")
    else:
        print("Hello, world!")


if __name__ == "__main__":
    main()

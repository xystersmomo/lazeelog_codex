//
//  Theme.swift
//  lazeelog-codex
//
//  Created by xystersmac on 5/3/26.
//


import SwiftUI

enum Theme {
    enum Colors {
        static let bg = Color(hex: 0x000000)
        static let bgElev = Color(hex: 0x0D0D0F)
        static let surface = Color.white.opacity(0.04)
        static let surfaceHi = Color.white.opacity(0.08)
        static let border = Color.white.opacity(0.06)
        static let borderHi = Color.white.opacity(0.12)
        static let text = Color.white
        static let textDim = Color(red: 235/255, green: 235/255, blue: 245/255).opacity(0.6)
        static let danger = Color(hex: 0xFF453A)
    }

    enum Radius {
        static let card: CGFloat = 22
        static let control: CGFloat = 14
    }
}

extension Color {
    init(hex: UInt, alpha: Double = 1) {
        self.init(
            .sRGB,
            red: Double((hex >> 16) & 0xff) / 255,
            green: Double((hex >> 8) & 0xff) / 255,
            blue: Double(hex & 0xff) / 255,
            opacity: alpha
        )
    }
}
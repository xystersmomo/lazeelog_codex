//
//  Category.swift
//  lazeelog-codex
//
//  Created by xystersmac on 5/3/26.
//


import SwiftUI

struct Category: Identifiable, Equatable {
    enum Kind {
        case work
        case distract
    }

    let id: String
    let name: String
    let color: Color
    let kind: Kind

    static let seed: [Category] = [
        .init(id: "design", name: "design", color: Color(hex: 0xFF9F0A), kind: .work),
        .init(id: "code", name: "code", color: Color(hex: 0x30D158), kind: .work),
        .init(id: "writing", name: "writing", color: Color(hex: 0x5E5CE6), kind: .work),
        .init(id: "meeting", name: "meeting", color: Color(hex: 0x64D2FF), kind: .work),
        .init(id: "reading", name: "reading", color: Color(hex: 0xBF5AF2), kind: .work),
        .init(id: "social", name: "social", color: Color(hex: 0xFF453A), kind: .distract),
        .init(id: "video", name: "video", color: Color(hex: 0xFF6482), kind: .distract),
        .init(id: "shopping", name: "shopping", color: Color(hex: 0xFF9500), kind: .distract)
    ]
}
//
//  TrackButton.swift
//  lazeelog-codex
//
//  Created by xystersmac on 5/3/26.
//


import SwiftUI

struct TrackButton: View {
    let color: Color
    let label: String
    let subLabel: String
    let holdProgress: Double
    let onTap: () -> Void
    let onHoldStart: () -> Void
    let onHoldCancel: () -> Void

    var body: some View {
        ZStack {
            Circle()
                .stroke(color.opacity(0.6), lineWidth: 4)
                .frame(width: 240, height: 240)

            Circle()
                .trim(from: 0, to: holdProgress)
                .stroke(Theme.Colors.danger, style: StrokeStyle(lineWidth: 6, lineCap: .round))
                .rotationEffect(.degrees(-90))
                .frame(width: 250, height: 250)

            VStack(spacing: 8) {
                Text(label)
                    .foregroundStyle(Theme.Colors.text)
                    .font(.system(size: 34, weight: .semibold, design: .monospaced))

                Text(subLabel)
                    .foregroundStyle(Theme.Colors.textDim)
                    .font(.system(size: 13, weight: .medium))
            }
        }
        .contentShape(Circle())
        .onTapGesture(perform: onTap)
        .gesture(
            LongPressGesture(minimumDuration: 0)
                .onChanged { _ in onHoldStart() }
                .onEnded { _ in onHoldCancel() }
        )
    }
}
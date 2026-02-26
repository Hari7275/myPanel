import React, { useState } from "react";
import { useGetMessageTemplatesQuery } from "../../../_store/api";
import { ChevronDown, ChevronRight, MessageSquare, Tag, Layers, Plus, Pencil } from "lucide-react";
import CreateMessageTemplate from "./CreateMessageTemplate";

const typeConfig = {
  category: {
    bg: "#fff",
    borderLeft: "4px solid #2196f3",
    badgeBg: "#e3f2fd",
    badgeColor: "#1565c0",
    icon: <Layers size={15} color="#1565c0" />,
    fontWeight: "700",
    fontSize: "14px",
  },
  subcategory: {
    bg: "#fafafa",
    borderLeft: "4px solid #9c27b0",
    badgeBg: "#f3e5f5",
    badgeColor: "#6a1b9a",
    icon: <Tag size={14} color="#6a1b9a" />,
    fontWeight: "600",
    fontSize: "13px",
  },
  message: {
    bg: "#fafafa",
    borderLeft: "4px solid #43a047",
    badgeBg: "#e8f5e9",
    badgeColor: "#2e7d32",
    icon: <MessageSquare size={13} color="#2e7d32" />,
    fontWeight: "400",
    fontSize: "13px",
  },
};

const TemplateNode = ({ node, depth = 0, onEdit }) => {
  const [open, setOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const cfg = typeConfig[node.type] || typeConfig.category;

  return (
    <div style={{ position: "relative" }}>
      {/* Vertical connector line for children */}
      {depth > 0 && (
        <div
          style={{
            position: "absolute",
            left: -16,
            top: 0,
            bottom: 0,
            width: "1px",
            backgroundColor: "#ddd",
          }}
        />
      )}

      <div
        style={{
          marginLeft: depth === 0 ? 0 : 24,
          marginBottom: "6px",
          position: "relative",
        }}
      >
        {/* Horizontal connector line */}
        {depth > 0 && (
          <div
            style={{
              position: "absolute",
              left: -16,
              top: "50%",
              width: "14px",
              height: "1px",
              backgroundColor: "#ddd",
            }}
          />
        )}

        {/* Node Row */}
        <div
          onClick={() => hasChildren && setOpen((prev) => !prev)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: cfg.bg,
            borderLeft: cfg.borderLeft,
            borderRadius: "0 6px 6px 0",
            padding: "9px 14px",
            cursor: hasChildren ? "pointer" : "default",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f5f5f5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = cfg.bg;
          }}
        >
          {/* Expand/Collapse Icon */}
          <span style={{ width: "16px", flexShrink: 0 }}>
            {hasChildren ? (
              open ? (
                <ChevronDown size={15} color="#888" />
              ) : (
                <ChevronRight size={15} color="#888" />
              )
            ) : null}
          </span>

          {/* Type Icon */}
          <span style={{ flexShrink: 0 }}>{cfg.icon}</span>

          {/* Text */}
          <span
            style={{
              flex: 1,
              fontSize: cfg.fontSize,
              fontWeight: cfg.fontWeight,
              color: "#222",
              lineHeight: "1.4",
            }}
          >
            {node.text}
          </span>

          {/* Right side: edit + badge + ID */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(node);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "24px",
                height: "24px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                backgroundColor: "#fff",
                cursor: "pointer",
                padding: 0,
              }}
              title="Edit"
            >
              <Pencil size={12} color="#666" />
            </button>
            <span
              style={{
                fontSize: "11px",
                backgroundColor: cfg.badgeBg,
                color: cfg.badgeColor,
                padding: "2px 9px",
                borderRadius: "10px",
                fontWeight: "500",
                textTransform: "capitalize",
              }}
            >
              {node.type}
            </span>
            <span style={{ fontSize: "11px", color: "#bbb", minWidth: "48px" }}>
              #{node.id}
            </span>
          </div>
        </div>

        {/* Children */}
        {hasChildren && open && (
          <div style={{ marginTop: "4px", position: "relative", paddingLeft: "16px" }}>
            {node.children.map((child) => (
              <TemplateNode key={child.id} node={child} depth={depth + 1} onEdit={onEdit} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MessageTemplatePage = () => {
  const [role, setRole] = useState("user");
  const [showCreate, setShowCreate] = useState(false);
  const [editData, setEditData] = useState(null);
  const { data, isLoading, isError } = useGetMessageTemplatesQuery({ role });
  const templates = data?.data?.data || data?.data || [];

  return (
    <div style={{ padding: "20px", height: "100%", overflowY: "auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h2 className="sub-heading" style={{ margin: 0 }}>
            Message Templates
          </h2>
          <button
            onClick={() => setShowCreate(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "6px 14px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "500",
              backgroundColor: "#1565c0",
              color: "#fff",
            }}
          >
            <Plus size={14} />
            Create
          </button>
        </div>

        {/* Role Toggle */}
        <div
          style={{
            display: "flex",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            padding: "4px",
            gap: "4px",
          }}
        >
          {["user", "listener"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              style={{
                padding: "6px 20px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "500",
                backgroundColor: role === r ? "#fff" : "transparent",
                color: role === r ? "#1565c0" : "#666",
                boxShadow: role === r ? "0 1px 4px rgba(0,0,0,0.12)" : "none",
                transition: "all 0.2s",
                textTransform: "capitalize",
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "14px" }}>
        {[
          { label: "Category", color: "#2196f3", icon: <Layers size={12} color="#2196f3" /> },
          { label: "Subcategory", color: "#9c27b0", icon: <Tag size={12} color="#9c27b0" /> },
          { label: "Message", color: "#43a047", icon: <MessageSquare size={12} color="#43a047" /> },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            {item.icon}
            <span style={{ fontSize: "12px", color: "#666" }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Content Card */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          minHeight: "200px",
          boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
        }}
      >
        {isLoading && (
          <p style={{ textAlign: "center", color: "#aaa", marginTop: "40px" }}>
            Loading templates...
          </p>
        )}

        {isError && (
          <p style={{ textAlign: "center", color: "#e53935", marginTop: "40px" }}>
            Failed to load templates. Please try again.
          </p>
        )}

        {!isLoading && !isError && templates.length === 0 && (
          <p style={{ textAlign: "center", color: "#aaa", marginTop: "40px" }}>
            No templates found for <strong>{role}</strong>
          </p>
        )}

        {!isLoading && !isError && templates.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {templates.map((node) => (
              <TemplateNode key={node.id} node={node} depth={0} onEdit={setEditData} />
            ))}
          </div>
        )}
      </div>

      <CreateMessageTemplate
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        role={role}
      />

      <CreateMessageTemplate
        isOpen={!!editData}
        onClose={() => setEditData(null)}
        role={role}
        editData={editData}
      />
    </div>
  );
};

export default MessageTemplatePage;

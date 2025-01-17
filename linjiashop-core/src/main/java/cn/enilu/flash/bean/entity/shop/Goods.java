package cn.enilu.flash.bean.entity.shop;

import cn.enilu.flash.bean.entity.BaseEntity;
import lombok.Data;
import org.hibernate.annotations.Table;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

/**
 * @author ：enilu
 * @date ：Created in 2019/10/29 17:39
 */
@Data
@Table(appliesTo = "t_shop_goods",comment = "商品")
@Entity(name="t_shop_goods")
@EntityListeners(AuditingEntityListener.class)
public class Goods extends BaseEntity {
    @NotBlank(message = "商品名称并能为空")
    @Column(columnDefinition = "VARCHAR(32) COMMENT '名称'")
    private String name;
    @NotBlank(message = "商品小图并能为空")
    @Column(columnDefinition = "VARCHAR(16) COMMENT '小图'")
    private String pic;
    @Column(columnDefinition = "VARCHAR(32) COMMENT '大图相册列表,以逗号分隔'")
    private String  gallery;
    @Column(name="id_category",columnDefinition = "BIGINT COMMENT '类别id'")
    private Long idCategory;
    @JoinColumn(name="id_category", insertable = false, updatable = false,foreignKey = @ForeignKey(name="none",value = ConstraintMode.NO_CONSTRAINT))
    @ManyToOne(fetch = FetchType.LAZY)
    private Category category;
    @Column(columnDefinition = "VARCHAR(64) COMMENT '产品简介'")
    @NotBlank(message = "商品简介并能为空")
    private String descript;
    @Column(columnDefinition = "TEXT COMMENT '产品详情'")
    private String detail;
    @Column(columnDefinition = "TEXT COMMENT '产品规格'")
    private String specifications;
    @Column(columnDefinition = "INT COMMENT '库存数量'")
    private Integer num;
    @Column(columnDefinition = "VARCHAR(16) COMMENT '价格'")
    private BigDecimal price;
    @Column(columnDefinition = "tinyint COMMENT '是否删除'")
    private Boolean isDelete= false;
    @Column(columnDefinition = "tinyint COMMENT '是否上架'")
    private Boolean isOnSale = true;

}
